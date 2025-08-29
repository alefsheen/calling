const mongoose = require("mongoose");
const { Contact } = require("./server"); // Ensure the model is exported in `server.js`

mongoose.connect(
  "mongodb://root:qsBDvMc27j2PK0BKbVYqquhl@olympus.liara.cloud:32778/tavana-call?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const contacts = [
  {
    id: 1,
    image: "/profile/eshaghian.png",
  },
  {
    id: 2,
    image: "",
  },
  {
    id: 3,
    image: "/profile/eslami.png",
  },
  {
    id: 4,
    image: "/profile/bakhshayesh.png",
  },
  {
    id: 5,
    image: "/profile/borbor.png",
  },
  {
    id: 6,
    image: "",
  },
  {
    id: 7,
    image: "/profile/hajiabolghasem.png",
  },
  {
    id: 8,
    image: "/profile/hosseinalibeygi.png",
  },
  {
    id: 9,
    image: "/profile/hoseininezhad.png",
  },
  {
    id: 10,
    image: "",
  },
  {
    id: 11,
    image: "/profile/khodabakhsh.png",
  },
  {
    id: 12,
    image: "",
  },
  {
    id: 13,
    image: "",
  },
  {
    id: 14,
    image: "/profile/rahaeeradin.png",
  },
  {
    id: 15,
    image: "/profile/zamani.png",
  },
  {
    id: 16,
    image: "/profile/sarchahi.png",
  },
  {
    id: 17,
    image: "/profile/soleymani.png",
  },
  {
    id: 18,
    image: "/profile/sheykhamiri.png",
  },
  {
    id: 19,
    image: "",
  },
  {
    id: 20,
    image: "",
  },
  {
    id: 21,
    image: "/profile/safakhani.png",
  },
  {
    id: 22,
    image: "/profile/fatahi.png",
  },
  {
    id: 23,
    image: "/profile/farahani.png",
  },
  {
    id: 24,
    image: "",
  },
  {
    id: 25,
    image: "/profile/ghadyani.png",
  },
  {
    id: 26,
    image: "/profile/karimisepehr.png",
  },
  {
    id: 27,
    image: "/profile/majidi.png",
  },
  {
    id: 28,
    image: "/profile/mohseni.png",
  },
  {
    id: 29,
    image: "/profile/mohammadipanah.png",
  },
  {
    id: 30,
    image: "/profile/mortazavi.png",
  },
  {
    id: 31,
    image: "",
  },
  {
    id: 32,
    image: "/profile/motiee.png",
  },
  {
    id: 33,
    image: "/profile/mirabyaneh.png",
  },
  {
    id: 34,
    image: "",
  },
  {
    id: 35,
    image: "/profile/neghabi.png",
  },
  {
    id: 36,
    image: "",
  },
  {
    id: 37,
    image: "",
  },
  {
    id: 38,
    image: "",
  },
];

async function updateImages() {
  try {
    for (const contact of contacts) {
      await Contact.updateOne(
        { id: contact.id }, // Find the contact by `id`
        { $set: { image: contact.image } } // Update only the `image` field
      );
    }
    console.log("Images updated successfully!");
  } catch (err) {
    console.error("Error updating images:", err);
  } finally {
    mongoose.connection.close();
  }
}

updateImages();
