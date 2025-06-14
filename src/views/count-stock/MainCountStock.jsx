import * as ExcelJS from "exceljs";
import { Fragment, useState } from "react";
import ShowData from "./ShowData";
import FormCountStock from "./form/FormCountStock";

export default function MainCountStock() {
  const [dataTable, setDataTable] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [dataRows, setDataRows] = useState({
    rows1: [
      ["9752", 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0322", 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    rows2: [
      ["0246", 399, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["3579", 399, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0352", 599, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0369", 799, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0161", 349, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0451", 699, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0321", 699, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0253", 899, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    rows3: [
      ["0568", 199, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0544", 159, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0575", 259, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0674", 199, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0698", 399, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  });

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    // ✅ ใส่ border ทุก cell ตั้งแต่ A1 ถึง AH21
    const startCol = 1; // A = 1
    const endCol = 37; // AK = 34
    const startRow = 1;
    const endRow = 21;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cell = sheet.getCell(row, col);
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      }
    }

    // ✅ Merge cells และใส่ข้อความ
    sheet.mergeCells("A2:AJ2");
    sheet.getCell("A2").value = "เกงใน";

    //get อักษรภาษาอังกฤษ
    const getColumnLetter = (index) => {
      let result = "";
      index++;
      while (index > 0) {
        let mod = (index - 1) % 26;
        result = String.fromCharCode(65 + mod) + result;
        index = Math.floor((index - 1) / 26);
      }
      return result;
    };

    //rows1
    dataRows.rows1.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const colLetter = getColumnLetter(colIndex);
        const cellRef = `${colLetter}${3 + rowIndex}`;
        sheet.getCell(cellRef).value = value;
      });

      const sumCell = `AJ${3 + rowIndex}`;
      sheet.getCell(sumCell).value = {
        formula: `SUM(C${3 + rowIndex}:AI${3 + rowIndex})`,
      };
    });

    sheet.mergeCells("A5:AJ5");
    sheet.getCell("A5").value = "เสื้อใน";

    //row2
    dataRows.rows2.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const colLetter = getColumnLetter(colIndex);
        const cellRef = `${colLetter}${6 + rowIndex}`;
        sheet.getCell(cellRef).value = value;
      });

      const sumCell = `AJ${6 + rowIndex}`;
      sheet.getCell(sumCell).value = {
        formula: `SUM(C${6 + rowIndex}:AI${6 + rowIndex})`,
      };
    });

    sheet.mergeCells("A14:AJ14");
    sheet.getCell("A14").value = "ชุดนอน";

    //rows3
    dataRows.rows3.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const colLetter = getColumnLetter(colIndex);
        const cellRef = `${colLetter}${15 + rowIndex}`;
        sheet.getCell(cellRef).value = value;
      });

      const sumCell = `AJ${15 + rowIndex}`;
      sheet.getCell(sumCell).value = {
        formula: `SUM(C${15 + rowIndex}:AI${15 + rowIndex})`,
      };
    });

    sheet.mergeCells("A20:B20");
    sheet.getCell("A20").value = "รวม";

    sheet.mergeCells("AK2:AK20");
    sheet.getCell("AK2").value = {
      formula: `SUM(AJ3:AJ19)`,
    };

    sheet.getCell("AJ20").value = {
      formula: `SUM(C20:AI20)`,
    };

    const columnsToSumProduct = [
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "AA",
      "AB",
      "AC",
      "AD",
      "AE",
      "AF",
      "AG",
      "AH",
      "AI",
    ];

    columnsToSumProduct.forEach((col) => {
      sheet.getCell(`${col}20`).value = {
        formula: `SUMPRODUCT(B3:B19, ${col}3:${col}19)`,
      };
    });

    // ✅ ตั้งค่าความกว้าง column (A - AH)
    sheet.columns = [
      { width: 15 }, // A
      { width: 10 }, // B
      ...Array.from({ length: endCol - 2 }, () => ({ width: 5 })), // C to AH
    ];

    // แก้ตรงนี้: เอา style ออก ไม่งั้นมันจะไป apply border เกินแถว 21
    sheet.columns = [
      { header: "รายการ/วันที่", key: "item_date", width: 20 },
      { header: "ราคา", key: "price", width: 10 },
      ...[...Array(12).keys()].map((i) => ({
        header: `${20 + i}`,
        key: `day_${20 + i}`,
        width: 5,
      })),
      ...[...Array(21).keys()].map((d) => ({
        header: `${d + 1}`,
        key: `day_${d + 1}`,
        width: 5,
      })),
      { header: "รวม", key: "item_total", width: 20 },
      { header: "จำนวนทั้งหมด", key: "item_total_all", width: 20 },
    ];

    // ✅ ตั้งค่าความสูงของแต่ละ row
    sheet.eachRow((row) => {
      row.height = 25;
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "count-stock.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Fragment>
      {isOpenForm ? (
        <div className="card">
          <div className="container-title pad-main !items-center">
            <p className="text-3xl">ข้อมูลชั้นใน</p>
            <button onClick={() => setIsOpenForm(!isOpenForm)} type="button" className="btn-excel !bg-blue-700">
              เพิ่มข้อมูลยอดขาย
            </button>
          </div>

          <div className="pad-main !mt-3">
            <button className="btn-excel" onClick={exportExcelFile}>
              <i className="fa-solid fa-file-excel text-xl"></i>
            </button>
          </div>
          <ShowData dataTable={dataTable} />
        </div>
      ) : (
        <FormCountStock setDataTable={setDataTable} dataRows={dataRows} setDataRows={setDataRows} onComeBack={() => setIsOpenForm(!isOpenForm)} />
      )}
    </Fragment>
  );
}
