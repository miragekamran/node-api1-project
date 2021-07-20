

import axios from "axios";

function deleteUser(e, id) {
    e.preventDefault();
    console.log("deleting");
    axios
        .delete(`https://apii-server.herokuapp.com/users/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log("delete error ", err))
        .finally(() => window.location.reload());
}

export default deleteUser;