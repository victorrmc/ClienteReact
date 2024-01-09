
import { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { tableService, desactiveProduct, deleteproduct } from '../services/table';
import { FormProduct } from './FormProduct';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { ModalDesactive } from './ModalDesactive';
import { TableUser } from './TableUser';

export function TableProduct({ token, role }) {
  const [products, setProducts] = useState([]);
  const [isNewProduct, setisNewProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isDetails, setDetails] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isUserTable, setIsUserTable] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (token) {
        try {
          const productsData = await tableService({ token });
          const filteredProducts = showActiveOnly ? productsData.filter((product) => product.state === "ACTIVE") : productsData;
          setProducts(filteredProducts);
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchProduct();
  }, [token, refresh, showActiveOnly]);

  const handleRefreshTable = () => {
    setTimeout(() => {
      setRefresh(!refresh);
    }, 500);
    console.log("Refresco");
  };

  const handleClickNew = () => setisNewProduct(true);

  const handleClickEdit = (productId) => setEditingProductId(productId);
  const handleClickDetails = (productId) => {
    setEditingProductId(productId);
    setDetails(true);
  };
  const handleClickBack = () => {
    setisNewProduct(false);
    setEditingProductId(null);
    setDetails(false);
    setIsUserTable(false);
    handleRefreshTable();
  };

  const handleClickDesactive = async (productId, reason) => {
    await desactiveProduct({ token, ID: productId, reason });
    handleRefreshTable();
  };

  const handleClickDelete = async (productId) => {
    await deleteproduct({ token, ID: productId });
    handleRefreshTable();
  };

  const handleClickUser = () => setIsUserTable(true);

  const handleClickStateHeader = () => setShowActiveOnly(!showActiveOnly);

  return (
    <>
      {isUserTable ? (
        <>
        <Button outline className='mb-2' onClick={handleClickBack}>
          <HiOutlineArrowLeft className="h-6 w-6" />
        </Button>
        <TableUser token={token} />
        </>
      ) : (
        <>
          {isNewProduct || editingProductId !== null ? (
            <div>
              <Button outline onClick={handleClickBack}>
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
              <FormProduct
                token={token}
                setisNewProduct={setisNewProduct}
                setEditingProductId={setEditingProductId}
                setDetails={setDetails}
                isDetails={isDetails}
                editingProductId={editingProductId}
                handleRefreshTable={handleRefreshTable}
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-2">
                <Button onClick={handleClickNew}>New Product</Button>
                {role === "ADMIN" && (
                  <Button color="blue" onClick={handleClickUser}>
                    User Table
                  </Button>
                )}
              </div>

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
                    {role === "ADMIN" && <Table.HeadCell>
                      <span className="sr-only">Delete</span>
                    </Table.HeadCell>}
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
                        {role === "ADMIN" && <Table.Cell> <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          onClick={() => handleClickDelete(product.productId)}>
                          Delete
                        </a></Table.Cell>}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
