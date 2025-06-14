import { Field, FieldArray, Form, Formik } from "formik";
import DataInner from "../../../helpers/DataInner.json";
import DataDate from "../../../helpers/DataDate.json";
import PropTypes from "prop-types";

FormCountStock.propTypes = {
  onComeBack: PropTypes.func,
  setDataRows: PropTypes.func,
  dataRows: PropTypes.object,
  setDataTable: PropTypes.func,
  dataTable: PropTypes.func,
};

export default function FormCountStock({ setDataTable, dataRows, setDataRows, onComeBack }) {
  return (
    <div className="card">
      <div className="container-title pad-main">
        <p className="text-3xl">เพิ่มข้อมูลชั้นใน</p>
        <button type="button" className="btn-excel !bg-blue-700" onClick={onComeBack}>
          <p className="text-xl">กลับ</p>
        </button>
      </div>
      <Formik
        initialValues={{
          date: "",
          month: "",
          index: "",
          items: [{ category: "", itemCode: "", amount: "" }],
        }}
        onSubmit={(values) => {
          setDataTable((prev) => [
            ...values.items.map((v, idx) => {
              const matchedCategory = DataInner.find((cat) => cat.items.some((item) => item.code === v.itemCode));
              const matchedItem = matchedCategory?.items.find((item) => item.code === v.itemCode);

              return {
                id: prev.length + idx + 1,
                code: v.itemCode,
                productName: v.category,
                price: matchedItem?.price ?? 0,
                amount: v.amount,
                createdAt: values.month,
              };
            }),
            ...prev,
          ]);

          // อัปเดต dataRows ตาม itemCode ทีละตัว
          const { index, items } = values;
          const targetIndex = parseInt(index, 10);
          const updatedData = { ...dataRows };

          items.forEach(({ itemCode, amount }) => {
            const amountToSet = parseInt(amount, 10);
            Object.keys(updatedData).forEach((key) => {
              updatedData[key] = updatedData[key].map((row) => {
                if (row[0] === itemCode) {
                  const updatedRow = [...row];
                  updatedRow[targetIndex] = amountToSet;
                  return updatedRow;
                }
                return row;
              });
            });
          });

          setDataRows(updatedData);

          onComeBack();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="pad-main">
            <div className="w-full pad-top-main">
              <label className="block font-medium">วันที่</label>
              <Field
                as="select"
                name="index"
                className="text-select"
                required
                onChange={(e) => {
                  const selectedIndex = e.target.value;
                  const selectedMount = DataDate.find((d) => d.index === selectedIndex)?.mount || "";
                  setFieldValue("index", selectedIndex);
                  setFieldValue("month", selectedMount);
                }}
              >
                <option value="">-- เลือก --</option>
                {DataDate.map((num) => (
                  <option key={num.index} value={num.index}>
                    {num.mount}
                  </option>
                ))}
              </Field>
            </div>

            <div className="w-full h-px bg-white !mt-6"></div>

            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, index) => {
                    const selectedCategory = values.items[index].category;
                    const productOptions = selectedCategory ? DataInner.find((cat) => cat.category === selectedCategory)?.items || [] : DataInner.flatMap((cat) => cat.items);

                    const selectedProduction = values.items[index].itemCode;
                    const filteredCategories = selectedProduction ? DataInner.filter((cat) => cat.items.some((a) => a.code === selectedProduction)) : DataInner.flatMap((cat) => cat);

                    return (
                      <div key={index} className="container-flex">
                        <div className="w-full pad-top-main">
                          <label className="block font-medium">หมวดหมู่</label>
                          <Field
                            as="select"
                            name={`items[${index}].category`}
                            className="text-select"
                            required
                            onChange={(e) => {
                              const selectedCategory = e.target.value;
                              setFieldValue(`items[${index}].category`, selectedCategory);
                              setFieldValue(`items[${index}].itemCode`, "");
                            }}
                          >
                            {!selectedProduction && <option value="">-- เลือก --</option>}
                            {filteredCategories.map((cat) => (
                              <option key={cat.category} value={cat.category}>
                                {cat.category}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="w-full pad-top-main">
                          <label className="block font-medium">สินค้า</label>
                          <Field
                            as="select"
                            name={`items[${index}].itemCode`}
                            className="text-select"
                            required
                            onChange={(e) => {
                              const selectedItemCode = e.target.value;
                              setFieldValue(`items[${index}].itemCode`, selectedItemCode);

                              const matchedCategory = DataInner.find((cat) => cat.items.some((item) => item.code === selectedItemCode));
                              if (matchedCategory) {
                                setFieldValue(`items[${index}].category`, matchedCategory.category);
                              }
                            }}
                          >
                            <option value="">-- เลือก --</option>
                            {productOptions.map((prod) => (
                              <option key={prod.code} value={prod.code}>
                                {prod.code} (฿{prod.price})
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="w-full pad-top-main">
                          <label className="block font-medium">จำนวน</label>
                          <Field
                            as="select"
                            name={`items[${index}].amount`}
                            className="text-select"
                            required
                            onChange={(e) => {
                              const selectedAmount = e.target.value;
                              setFieldValue(`items[${index}].amount`, selectedAmount);
                            }}
                          >
                            <option value="">-- เลือก --</option>
                            {[...Array(50)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="flex gap-2 pad-top-main">
                          <button
                            type="button"
                            onClick={() => {
                              push({ category: "", itemCode: "" });
                            }}
                            className="btn-add"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          {values.items.length > 1 && (
                            <button type="button" onClick={() => remove(index)} className="btn-remove">
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            <div className="flex w-full justify-center pad-button-top-main">
              <button type="submit" className="btn-excel !bg-blue-700">
                บันทึก
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
