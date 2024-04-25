import Post from "@/components/Post";
import { cookieBasedCleint } from "@/utils/amplify-utils";
import { isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";

// import {Schema} from "@/../amplify/data/resource"


export default async function Home() {
  // const client = generateClient<Schema>();
  const isAuth = await isAuthenticated();
  const {data: posts, errors} = await cookieBasedCleint.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isAuth ? "userPool" : "iam",
    // authMode: "userPool",
  }) 
  if(errors){
    console.log("Error: ",errors)
  }else{
    console.log("post", posts)
  }
  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1>All Titles</h1>
      {posts?.map(async (post, idx) => (
        <Post 
          onDelete={onDeletePost}
          post={post}
          key={idx}
          isSignedIn={isAuth}
        />
      ))}
    </main>
  );
}
