import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { tableServiceUser, deleteUser } from '../services/tableUser';
import { FormUser } from './FormUser';

export function TableUser({ token }) {
    const [uses, setUses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    const handleRefreshTable = () => {
        setTimeout(() => {
          setRefresh(!refresh);
        }, 500);
      };

    useEffect(() => {
        async function fetchUse() {

            if (token) {
                try {
                    const usesData = await tableServiceUser({ token });
                    setUses(usesData);
                } catch (e) {
                    console.log(e);
                }
            }
        }

        fetchUse();
    }, [token, refresh]);

    const handleClickDelete = async (useId) => {
        await deleteUser({ token, ID: useId });
        handleRefreshTable();
      };
      const handleClickNew = () => setIsNewUser(true);

    return (
        <>
        {isNewUser ? 
            <FormUser token={token} handleRefreshTable={handleRefreshTable} setIsNewUser={setIsNewUser}/> : (
        <>
         <Button className='mb-2' onClick={handleClickNew}>New User</Button>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>UserName</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Country</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {uses.map((use) => (
                        <Table.Row key={use.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {use.id}
                            </Table.Cell>
                            <Table.Cell>{use.username}</Table.Cell>
                            <Table.Cell>{use.authorities?.[0].authority}</Table.Cell>
                            <Table.Cell>{use.country}</Table.Cell>
                            <Table.Cell> <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                onClick={() => handleClickDelete(use.id)}>
                                Delete
                            </a></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </>
            )
        }
        </>
    );
}