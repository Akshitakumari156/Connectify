export default function userDetail(userId) {
  return fetch(`http://localhost:5000/users/${userId}`).then((res) => res.json());
}