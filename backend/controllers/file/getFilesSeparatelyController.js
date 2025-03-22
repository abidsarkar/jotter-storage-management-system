const File = require ('../../models/file.js');
const { formatBytes } =require ('../../extra/formatBytes.js');

exports.getImagesController = async (req, res) => {
  try {
    const images = await File.find({ 
      userId: req.user.id, 
      contentType: { $regex: /^image\// }  // Matches any image type (e.g., image/png, image/jpeg)
    });
    
    if (images.length === 0) {
      return res.status(404).json({ msg: 'No images found' });
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getPdfsController = async (req, res) => {
  try {
    const pdfs = await File.find({ 
      userId: req.user.id, 
      contentType: 'application/pdf'  // PDFs have a fixed contentType
    });

    if (pdfs.length === 0) {
      return res.status(404).json({ msg: 'No PDFs found' });
    }
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getFoldersController = async (req, res) => {
  try {
    const folders = await File.find({
      userId: req.user.id,
      contentType: "folder",
    });

    if (folders.length === 0) {
      return res.status(404).json({ msg: "No folders found" });
    }
    res.json(folders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getNotesController = async (req, res) => {
  try {
    const notes = await File.find({ 
      userId: req.user.id, 
      contentType: { $nin: ['folder', 'application/pdf'], $not: { $regex: /^image\// } } 
      // Exclude folders, PDFs, and images. Everything else is considered a note.
    });

    if (notes.length === 0) {
      return res.status(404).json({ msg: 'No notes found' });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getFileStorageCountController = async (req, res) => {
  try {
    const fileCategories = [
      { type: 'image', query: { contentType: { $regex: /^image\// } } },
      { type: 'pdf', query: { contentType: 'application/pdf' } },
      { type: 'folder', query: { contentType: 'folder' } },
      { type: 'note', query: { contentType: { $nin: ['folder', 'application/pdf'], $not: { $regex: /^image\// } } } }
    ];

    const stats = {};

    for (const category of fileCategories) {
      const files = await File.find({ userId: req.user.id, ...category.query });
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);

      stats[category.type] = {
        count: files.length,
        totalSize: formatBytes(totalSize)
      };
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


