import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import fetcher from "../helpers/fetcher";
// import Spinner from './Spinner';

export default function ProductModal({
  data,
  setProductModal,
  handleAddProduct,
}) {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef(null);
  const [currentProduct, setCurrentProduct] = useState("");
  const [prioritizedProducts, setPrioritizedProducts] = useState([]);
  const [productTotals, setProductTotals] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    async function getData() {
      const [prioritizedProductsData, productTotals] = await Promise.all([
        fetcher("/products/getFavorite"),
        fetcher("/products/getProductTotals"),
      ]);
      setPrioritizedProducts(prioritizedProductsData);
      setProductTotals(productTotals);
    }

    getData();
  }, []);

  useEffect(() => {
    if (data && productTotals.length !== 0) {
      let quantities = {};
      data.forEach(({ name, note }) => {
        quantities[name] = note.stock ? note.stock - productTotals[name] : 0;
      });
      setProductQuantities(quantities);
    }
  }, [productTotals, data]);

  function handleChange(e) {
    const name = e.target.value;
    const product = data.find((product) => product.name === name);
    setCurrentProduct(product);
  }

  useEffect(() => {
    function closeFunction(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setProductModal(false);
      }
    }
    window.addEventListener("click", closeFunction);

    return () => {
      window.removeEventListener("click", closeFunction);
    };
  }, [setProductModal]);

  if (data) {
    return (
      <div className="absolute flex inset-0 justify-center pt-[30%] w-screen h-screen">
        <div className="fixed w-[9999px] h-[9999px] top-0 left-0 backdrop-blur-sm z-[9998]"></div>
        <form
          className="relative w-[80vw] h-[35vh] bg-white shadow-xl border-[1px] border-darkcoral rounded-lg z-[9999] p-4 pt-8 flex flex-col gap-4"
          onSubmit={(e) =>
            handleAddProduct(e, productQuantities[currentProduct.name])
          }
          ref={modalRef}
        >
          <button
            className="absolute right-2 top-2"
            onClick={() => {
              setProductModal(false);
            }}
          >
            <X />
          </button>
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="productSelect" className="text-lg">
              Produkt:
            </label>
            <select
              name="productSelect"
              id="productSelect"
              onChange={handleChange}
              required
              className="w-full p-2 border-[1px] border-[#CCCCCC]  noScrollbar"
            >
              <option value=""> - Wybierz z listy -</option>
              <optgroup
                label="Najczęściej zamawiane"
                className="text-[#f28a72]"
              >
                {prioritizedProducts.map((product, index) =>
                  productQuantities[product.name] > 0 ? (
                    <option
                      value={product.name}
                      key={`priority-${index}`}
                      className="text-[#303c6c] font-[600]"
                    >
                      {product.name}{" "}
                      <span>
                        {productQuantities[product.name] < 50 &&
                          `- zostało ${productQuantities[product.name]} ${
                            product.packagingMethod === "kg"
                              ? product.packagingMethod
                              : ""
                          }`}
                      </span>
                    </option>
                  ) : (
                    <option
                      value={product.name}
                      key={`priority-${index}`}
                      className="text-slate font-[600]"
                      disabled
                    >
                      {product.name}
                      <span> - wyprzedane</span>
                    </option>
                  )
                )}
              </optgroup>
              <optgroup label="Stała oferta" className="text-[#f28a72]">
                {data
                  .filter(
                    (product) =>
                      !product.seasonal &&
                      !prioritizedProducts.some((p) => p.name === product.name)
                  )
                  .map((product, index) =>
                    productQuantities[product.name] > 0 ? (
                      <option
                        value={product.name}
                        key={`regular-${index}`}
                        className="text-[#303c6c] font-[600]"
                      >
                        {product.name} - zostało{" "}
                        {productQuantities[product.name]}{" "}
                        {product.packagingMethod === "kg" &&
                          product.packagingMethod}
                      </option>
                    ) : (
                      <option
                        value={product.name}
                        key={`regular-${index}`}
                        className="text-slate font-[600]"
                        disabled
                      >
                        {product.name} - wyprzedane
                      </option>
                    )
                  )}
              </optgroup>
              <optgroup label="Sezonowe" className="text-[#f28a72]">
                {data
                  .filter(
                    (product) =>
                      product.seasonal &&
                      !prioritizedProducts.some((p) => p.name === product.name)
                  )
                  .map((product, index) =>
                    productQuantities[product.name] > 0 ? (
                      <option
                        value={product.name}
                        key={`seasonal-${index}`}
                        className="text-[#303c6c] font-[600]"
                      >
                        {product.name} - zostało{" "}
                        {productQuantities[product.name]}{" "}
                        {product.packagingMethod === "kg" &&
                          product.packagingMethod}
                      </option>
                    ) : (
                      <option
                        value={product.name}
                        key={`seasonal-${index}`}
                        className="text-slate font-[600]"
                        disabled
                      >
                        {product.name} - wyprzedane
                      </option>
                    )
                  )}
              </optgroup>
            </select>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="quantity" className="text-lg">
              Ilość:{" "}
              {currentProduct ? `(${currentProduct.packagingMethod})` : ""}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                defaultValue={1}
                max={productQuantities[currentProduct.name]}
                step="0.01"
                required
                className="w-[100px] border-[1px] border-[#CCCCCC] p-1 text-lg"
              />
              <div className="flex gap-2 h-full justify-center self-start">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity + 1 > productQuantities[currentProduct.name])
                      return;
                    setQuantity((current) => current + 1);
                  }}
                >
                  <CirclePlus className="w-[2rem] h-auto" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity - 1 >= 0) {
                      setQuantity((current) => current - 1);
                    }
                  }}
                >
                  <CircleMinus className="w-[2rem] h-auto" />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <button className="w-full! flex justify-center items-center h-[50px] bg-[#f28a7280]!">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    );
  }
}
