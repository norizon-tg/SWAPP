
const categories = [
  {
    id: "StackNavigator",
    name: "Feed",
    tags: ["main menu"],
    count: 16,
    image: require("../assets/icons/feed_icon.png")
  },
  {
    id: "Explore",
    name: "Explore",
    tags: ["main menu"],
    count: 147,
    image: require("../assets/icons/explore_icon.png")
  },
  {
    id: "Uploadv2",
    name: "Upload",
    tags: ["main menu"],
    count: 147,
    image: require("../assets/icons/upload_icon.png")
  },
  {
    id: "pawn",
    name: "Pawn",
    tags: ["main menu"],
    count: 147,
    image: require("../assets/icons/pawnimage.png")
  },
  {
    id: "Explore",
    name: "Cellphones",
    tags: ["products"],
    count: 147,
    image: require("../assets/icons/phone_icon.png")
  },
  
  
];

const products = [
  {
    id: 1,
    name: "Item Name",
    description:
      "Description: potted in a mixed garden soil \n" +
      
      "Condition: in good condition \n" +
      
      "Preferred Items: 15kls rice(not NFA) \n" +
      
      "Mode of Trade: Pick Up \n" +
      
      "\n \nDisclaimer: SWAPP is not liable for any risks involved in the barter of goods or services. I am aware that there are no guarantees and warranties, and that I am responsible for my own trade.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png")
    ]
  }
];

const explore = [
  // images
  require("../assets/images/explore_1.png"),
  require("../assets/images/explore_2.png"),
  require("../assets/images/explore_3.png"),
  require("../assets/images/explore_4.png"),
  require("../assets/images/explore_5.png"),
  require("../assets/images/explore_6.png")
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

export { categories, explore, products, profile };
