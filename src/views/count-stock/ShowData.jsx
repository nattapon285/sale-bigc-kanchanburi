import { useState } from "react";
import PropTypes from "prop-types";

ShowData.propTypes = {
  dataTable: PropTypes.array.isRequired,
};

export default function ShowData({ dataTable }) {
  const [loading] = useState(false);

  return (
    <div className="overflow-x-auto pad-main">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[5%]">ลำดับ</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[20%]">รหัส</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[20%]">รายการ</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">ราคา</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">จำนวน</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[25%]">เดือน</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <></>
          ) : dataTable?.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-red-500 bg-red-100 h-30">
                <p className="text-xl"> 🕵️‍♂️ ไม่มีข้อมูลที่จะแสดง ณ ตอนนี้</p>
              </td>
            </tr>
          ) : (
            dataTable?.map((item, index) => (
              <tr key={index} className="bg-white text-black">
                <td className="border border-gray-300 !p-3 text-center">{index + 1}</td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.code}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">{item.productName}</td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.price}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.amount}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.createdAt}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
