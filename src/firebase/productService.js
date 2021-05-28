import { firestore } from "./firebase";
import { storage } from "./firebase";

export const appNewProduct = async (productDetails) => {
  await firestore
    .collection("produts")
    .add(productDetails)
    .then(() => console.log("product added"))
    .catch((err) => console.log(err));
};

export const getAllProducts = async () => {
  const result = await firestore.collection("produts").get();

  const products = result.docs.map((doc) => ({
    ...doc.data(),
    productId: doc.id,
  }));

  return products;
};

export const getProductById = async (productId) => {
  const result = await firestore.collection("produts").doc(productId).get();
  const product = { ...result.data(), productId };
  return product;
};

export const getProductByCategory = async (category) => {
  const result = await firestore
    .collection("produts")
    .where("category", "==", category)
    .get();

  const products = result.docs.map((doc) => ({
    ...doc.data(),
    productId: doc.id,
  }));
  return products;
};

// store images into firebase bucket
export const addImageToStorageBucket = async (
  image,
  setIsLoading,
  setProgressValue,
  setImageUrl,
  path
) => {
  const imageName = Date.now() + image.name;
  setIsLoading(true);

  const uploadTask = storage.ref(`${path}/${imageName}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot.bytesTransferred);
      setProgressValue((snapshot.bytesTransferred / image.size) * 100);
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref(path)
        .child(imageName)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          setImageUrl(url);
          setIsLoading(false);
        });
    }
  );
};

export const addProductToCart = async (product, customerId, quantity) => {
  let item = { ...product, customerId: customerId, quantity: quantity };

  await firestore
    .collection("cart")
    .add(item)
    .then(() => console.log("item added to cart"))
    .catch((err) => console.log(err));
};

export const addOrder = async (
  productId,
  customerId,
  sellerId,
  quantity,
  price
) => {
  await firestore
    .collection("orders")
    .add({
      productId,
      customerId,
      sellerId,
      price: Number(price) * Number(quantity),
      createdAt: Date.now(),
      status: "pending",
    })
    .then(() => console.log("order placed"))
    .catch((err) => console.log(err));
};

export const getOrders = async (userId, forWho) => {
  const result = await firestore
    .collection("orders")
    .where(forWho, "==", userId)
    .get();

  const orders = result.docs.map((order) => ({
    ...order.data(),
    id: order.id,
  }));

  return orders;
};
