import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { tableService, desactiveProduct } from '../services/table';
import { FormProduct } from '../components/FormProduct';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { ModalDesactive } from './ModalDesactive';

export function TableProduct({ token }) {

  const [products, setProducts] = useState([]);
  const [isNewProduct, setisNewProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isDetails, setDetails] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const handleClickStateHeader = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const handleRefreshTable = () => {
    setTimeout(() => {
      setRefresh(!refresh);
    }, "500")
    console.log("Refresco")
  };

  const handleClickNew = async (event) => {
    setEditingProductId(null);
    setisNewProduct(true);
    setDetails(false);
  };

  const handleClickEdit = (productId) => {
    setEditingProductId(productId);
    setisNewProduct(false);
    setDetails(false);
  };
  const handleClickDetails = (productId) => {
    setEditingProductId(productId);
    setisNewProduct(false);
    setDetails(true);
  };

  const handleClickBack = (event) => {
    setisNewProduct(false)
    setEditingProductId(null);
    setDetails(false);
    handleRefreshTable()
  };

  const handleClickDesactive = async (productId, reason) => {
    await desactiveProduct({ token, ID: productId, reason })
    handleRefreshTable()
  };


  useEffect(() => {
    async function fetchProduct() {
      if (token) {
        try {
          const productsData = await tableService({ token });

          // Filtrar productos según el estado activo
          const filteredProducts = showActiveOnly
            ? productsData.filter((product) => product.state === "ACTIVE")
            : productsData;

          setProducts(filteredProducts);
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchProduct();
  }, [token, refresh, showActiveOnly]);

  return (
    <>
      {isNewProduct || editingProductId !== null ? (
        <div>
          <Button outline onClick={handleClickBack}>
            <HiOutlineArrowLeft className="h-6 w-6" />
          </Button>
          <FormProduct token={token} setisNewProduct={setisNewProduct} setEditingProductId={setEditingProductId} setDetails={setDetails} isDetails={isDetails} editingProductId={editingProductId} handleRefreshTable={handleRefreshTable} />
        </div>
      ) : (<div>
        <Button onClick={handleClickNew} className='mb-2'>
          New Product
        </Button>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell onClick={handleClickStateHeader}>
                {showActiveOnly ? <span className="cursor-pointer text-yellow-400 ">State - ACTIVE</span> :
                 <span className="cursor-pointer text-zinc-100 ">State - ALL ↓</span>}
              </Table.HeadCell>
              <Table.HeadCell>Creation Date</Table.HeadCell>
              <Table.HeadCell>Creator</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Details</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Desactive</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product) => (
                <Table.Row key={product.productId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.productId}
                  </Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.state}</Table.Cell>
                  <Table.Cell>{product.creationDate}</Table.Cell>
                  <Table.Cell>{product.creator}</Table.Cell>
                  <Table.Cell>
                    {product.state !== "DISCONTINUED" && (
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleClickEdit(product.productId)}
                      >
                        Edit
                      </a>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => handleClickDetails(product.productId)}>
                      Details
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {product.state !== "DISCONTINUED" && (
                      <ModalDesactive handleClickDesactive={handleClickDesactive} productId={product.productId} />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      )}
    </>
  );
}
