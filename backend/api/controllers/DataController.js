/* eslint-disable linebreak-style */
module.exports = {
    async getData(req, res) {
        try {
          const data = await Data.find();
          return res.json(data);
        } catch (err) {
          return res.serverError(err);
        }
      },
      async createData(req, res) {
        try {
          const newData = await Data.create(req.body).fetch();
          return res.json(newData);
        } catch (err) {
          return res.serverError(err);
        }
      },
      async deleteData(req, res) {
        try {
            const { id } = req.body; // Lấy id từ body của request
            const deletedData = await Data.destroyOne({ id });
            if (!deletedData) {
                return res.notFound('No data found with that id');
            }
            return res.ok('Data deleted successfully');
        } catch (err) {
            return res.serverError(err);
        }
    },
    async updateData(req, res) {
      try {
        const { id, text } = req.body; // Lấy id và text từ body của request
        // Kiểm tra xem id có tồn tại không
        const dataToUpdate = await Data.findOne({ id });
        if (!dataToUpdate) {
          return res.notFound('No data found with that id');
        }
        // Cập nhật dữ liệu
        const updatedData = await Data.updateOne({ id }).set({ text });
        return res.ok('Data updated successfully');
      } catch (err) {
        return res.serverError(err);
      }
    }
    
      
      
  };