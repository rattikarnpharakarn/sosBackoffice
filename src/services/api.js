import axios from 'axios';


const BASE_URI = 'http://localhost:80'

export const GetAllUser = async () => {
  try {
    const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
    const apiUrl = 'http://localhost:80/SosApp/accounts/admin/user';
    const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
    // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
    axios.get(apiUrl, { headers: { Authorization: AuthStr } })
      .then(response => {
        // If request is good...
        
      })
      .catch((error) => {
        console.log('error ' + error);
      });
    // return data;
  } catch (error) {
    // throw new Error(error);
    console.error(error);
    return error.response;
  }
};