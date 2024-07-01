import { postService, authorService, commentService } from '../services';
import { IAuthor, IComment, IPost } from "../types";

const initialPosts: IPost[] = [
  {
    id: 1,
    title: "The Pulse of Urban Life",
    text: "City living offers a unique blend of challenges and rewards. This article explores the vibrant lifestyle of urban dwellers, featuring insights into the dynamics of bustling city centers around the world.",
    image: "https://news.sap.com/wp-content/blogs.dir/1/files/2024/02/22/288989_GettyImages-959950902_medium_uncropped_F-540x310.jpg",
    authorEmail: "urbanite@example.com"
  },
  {
    id: 2,
    title: "Cutting-Edge Technology Trends",
    text: "Stay ahead of the curve with our comprehensive analysis of the latest technological advancements. From artificial intelligence to quantum computing, find out how these innovations are reshaping industries.",
    image: "https://news.sap.com/wp-content/blogs.dir/1/files/2024/02/22/288989_GettyImages-959950902_medium_uncropped_F-540x310.jpg",
    authorEmail: "techgeek@example.com"
  },
  {
    id: 3,
    title: "A Culinary Journey",
    text: "Embark on a culinary adventure that brings you the flavors of the world. Learn about unique dishes from various cultures and how you can recreate them at home with simple ingredients and techniques.",
    image: "https://news.sap.com/wp-content/blogs.dir/1/files/2024/02/22/288989_GettyImages-959950902_medium_uncropped_F-540x310.jpg",
    authorEmail: "foodie@example.com"
  },
  {
    id: 4,
    title: "Exploring the Great Outdoors",
    text: "Join us as we delve into the beauty and serenity of our national parks. From towering forests and serene lakes to majestic wildlife, discover what makes each park a treasure trove of natural wonders.",
    image: "https://news.sap.com/wp-content/blogs.dir/1/files/2024/02/22/288989_GettyImages-959950902_medium_uncropped_F-540x310.jpg",
    authorEmail: "alexiialin96@gmail.com"
  },
];

const initialComments: IComment[] = [
  {
    id: 1,
    postId: 4,
    text: "This was a truly enlightening read! The descriptions of the landscapes were vivid and inviting.",
    authorEmail: "alexiialin96@gmail.com"
  },
  {
    id: 2,
    postId: 4,
    text: "I visited one of these parks last year and this article brought back so many wonderful memories!",
    authorEmail: "commenter2@example.com"
  },
  {
    id: 3,
    postId: 4,
    text: "Absolutely loved the detailed coverage of hidden trails. Can't wait to check them out myself.",
    authorEmail: "hiker42@example.com"
  },
  {
    id: 4,
    postId: 4,
    text: "Your tips on the best times to visit for avoiding crowds were spot on. Thank you for the great advice!",
    authorEmail: "traveljunkie@example.com"
  },
  {
    id: 6,
    postId: 4,
    text: "As a nature enthusiast, I appreciate the emphasis on conservation and respecting wildlife. Important message!",
    authorEmail: "envirofan@example.com"
  },
  {
    id: 7,
    postId: 4,
    text: "Could you recommend specific gear for tackling some of the tougher trails mentioned?",
    authorEmail: "gearhead@example.com"
  }
];

const initialAuthors: IAuthor[] = [
  {
    email: "alexiialin96@gmail.com",
    userName: "Alexii Alin",
    image: "https://avatars.githubusercontent.com/u/22970703?s=96&v=4"
  },
  {
    email: "urbanite@example.com",
    userName: "Urban Explorer",
    image: "https://cdn-icons-png.flaticon.com/512/219/219970.png"
  },
  {
    email: "techgeek@example.com",
    userName: "Tech Geek",
    image: "https://cdn-icons-png.freepik.com/512/219/219966.png"
  },
  {
    email: "foodie@example.com",
    userName: "Foodie",
    image: "https://cdn-icons-png.flaticon.com/512/219/219970.png"
  },
  {
    email: "commenter2@example.com",
    userName: "Nature Enthusiast",
    image: "https://cdn-icons-png.flaticon.com/512/219/219970.png"
  },
  {
    email: "hiker42@example.com",
    userName: "Trail Hiker",
    image: "https://cdn-icons-png.freepik.com/512/219/219966.png"
  },
  {
    email: "traveljunkie@example.com",
    userName: "Travel Junkie",
    image: "https://cdn-icons-png.flaticon.com/512/219/219970.png"
  },
  {
    email: "envirofan@example.com",
    userName: "Environmentalist",
    image: "https://cdn-icons-png.flaticon.com/512/219/219970.png"
  },
  {
    email: "gearhead@example.com",
    userName: "Gear Aficionado",
    image: "https://cdn-icons-png.freepik.com/512/219/219966.png"
  }
];

export async function resetDatabase() {
  // Clear existing data
  localStorage.clear();

  // Populate posts
  for (const post of initialPosts) {
    await postService.createPost(post);
  }

  // Populate comments
  for (const comment of initialComments) {
    await commentService.createComment(comment);
  }

  // Populate authors
  for (const author of initialAuthors) {
    await authorService.createAuthor(author);
  }

  alert('Database reset and populated successfully!');
}
