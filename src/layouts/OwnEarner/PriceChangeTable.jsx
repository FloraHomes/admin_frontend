import React from 'react';
import { priceChanges } from '../../mock/priceChanges';
import { amountFormat, dateInWord } from '../../utils/format';

const PriceChangeTable = () => {
    return (
        <table className="table table-report sm:mt-2">
        <thead>
          <tr>
            <th className="whitespace-nowrap text-primary">Date</th>
            <th className="text-center whitespace-nowrap text-success">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {priceChanges?.map((price) => (
            <tr key={price?.date} className="intro-x">
              <td>
                <a href="" className="font-medium whitespace-nowrap">
                {dateInWord(price?.date)}
                </a>
               
              </td>
              <td className="text-center">&#8358;{amountFormat(price?.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default PriceChangeTable;