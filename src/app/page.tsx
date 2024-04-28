import Todo from "@/components/Todo";
import { cookieBasedCleint } from "@/utils/amplify-utils";
import { isAuthenticated } from "@/utils/amplify-utils";
import { onDeleteTodo } from "./_actions/actions";
import AuthClient from "@/components/auth/AuthClient";
import AddPost from "./add/page";
import moment from "moment";

// import {Schema} from "@/../amplify/data/resource"


export default async function Home() {
  // const client = generateClient<Schema>();
  const isAuth = await isAuthenticated();
  if(!isAuth){
    return (
      <div className="flex flex-col items-center gap-4 pt-10">
            <h1>Please Sign In to access the App</h1>
            <AuthClient />
        </div>
    )
  }
  // const router = useRouter();
  const { data: todos, errors } = await cookieBasedCleint.models.Task.list({
    authMode: "userPool",
    // authMode: "userPool",
  })
  if (errors) {
    console.log("Error: ", errors)
  } else {
    console.log("post", todos)
  }

  const sortedTodos = todos.sort(function (left, right) {
    return moment.utc(right.updatedAt).diff(moment.utc(left.updatedAt))
});

  // const redirectToSignInPage = () => {
  //   router.push("/signin");
  // }
  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      {isAuth ? (
        <>
          {todos.length > 0 ? (
            <>
              <h1 className="text-2xl pb-4">Your Todos</h1>
              {sortedTodos.map(async (todo) => (
                <Todo
                  onDelete={onDeleteTodo}
                  todo={todo}
                  key={todo.id}
                  isSignedIn={isAuth}
                />
              ))}
            </>
          ) : (
            <div className="p-4 flex flex-col items-center gap-4">
              <h1>No Todos created yet, Create now</h1>
              <AddPost />
            </div>
          )}

        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1>Please Sign In to access the App</h1>
            <AuthClient />
          </div>
        </>
      )}
    </main>
  );
}
