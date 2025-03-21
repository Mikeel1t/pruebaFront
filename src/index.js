import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import listaUsuario from './userList';
import './index.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const apiKey = "63473330c1927d386ca6a3a5";
    const apiUrl = "https://dummyapi.io/data/v1/user";
    const fetchUsers = async () => {
        try{
            const Response = await axios.get(apiUrl, {
                headers: {
                    'app-id': apiKey,
                }
            });
            setUsers(Response.data.data);

        }catch(error){
            console.error('Error al consultar usuarios', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`, {
                headers: {
                    'app-id': apiKey,
                }
            });
            fetchUsers();//Recarga la lista de usuarios
        } catch(error){
            console.error('Error al eliminar usuarios', error);
        }
    }

    useEffect( () => {
        fetchUsers();
    }, []);

    return(
        <div>
            <CreateUser fetchUsers={fetchUsers} />
            <userList users={users} deleteUser={deleteUser} setSelectedUser={setSelectedUser} />
            {selectedUser && <UpdateUser user={selectedUser} fetchUsers={fetchUsers} />}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementId('root'));