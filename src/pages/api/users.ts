import type { NextApiRequest, NextApiResponse } from 'next';
import { usersData } from '../../data/data';

type ResponseData = {
    message: string;
    data: any[];
    totalPages: number;
};

// This is the api to return users data to frontend

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const pageSize = parseInt(req.query.pageSize?.toString() || '0');
    const currentPage = parseInt(req.query.currentPage?.toString() || '0');
    const sorting = req.query.sorting;
    let sortedData = usersData;
    if (sorting == 'rate') {
        sortedData = sortedData.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else {
        sortedData = sortedData.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }
    res.status(200).json({
        message: 'Data Fetched successfully',
        data: sortedData.slice(
            pageSize * (currentPage - 1),
            pageSize * currentPage
        ),
        totalPages: Math.ceil(usersData.length / pageSize),
    });
}
