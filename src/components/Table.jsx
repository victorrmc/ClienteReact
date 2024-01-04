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
  const [refresh, setRefresh] = useState(false);

  const handleRefreshTable = () => {
    setRefresh(!refresh);
  };

  const handleClickNew = async (event) => {
    setEditingProductId(null);
    setisNewProduct(true);
  };

  const handleClickEdit = (productId) => {
    setEditingProductId(productId);
    setisNewProduct(false);
  };

  const handleClickBack = (event) => {
    setisNewProduct(false)
    setEditingProductId(null);
  };

  const handleClickDesactive = async (productId, reason) => {
    console.log(reason)
    await desactiveProduct({ token, ID: productId, reason })
    handleRefreshTable()
  };


  useEffect(() => {
    async function fetchProduct() {
      console.log("Efecto")
      if (token) {
        try {
          console.log("Efecto con token")
          const productsData = await tableService({ token });
          setProducts(productsData);
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchProduct();
  }, [token, refresh]);

  return (
    <>
      {isNewProduct || editingProductId !== null ? (
        <div>
          <Button outline onClick={handleClickBack}>
            <HiOutlineArrowLeft className="h-6 w-6" />
          </Button>
          <FormProduct token={token} setisNewProduct={setisNewProduct} editingProductId={editingProductId} setEditingProductId={setEditingProductId} handleRefreshTable={handleRefreshTable} />
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
              <Table.HeadCell>State</Table.HeadCell>
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
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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
