import axios from 'axios';

export const fetchUsersData = async (
    pageSize: number,
    currentPage: number,
    sorting: string | null
) => {
    const usersData = await axios.get(
        `http://localhost:3000/api/users?pageSize=${pageSize}&currentPage=${currentPage}${
            sorting ? `&sorting=${sorting}` : ''
        }`
    );
    return usersData.data;
};
