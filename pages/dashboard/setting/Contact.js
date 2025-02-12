export default function Contact() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">تماس با ما</h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold mb-2">شماره تماس</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="شماره تماس را وارد کنید"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">ایمیل</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              placeholder="ایمیل را وارد کنید"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">آدرس</label>
            <textarea
              className="w-full border rounded p-2"
              rows="4"
              placeholder="آدرس را وارد کنید"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ذخیره
          </button>
        </form>
      </div>
    );
  }
  