import { addComment, deleteComment } from "@/app/_actions/actions";
import AddComments from "@/components/AddComments";
import { cookieBasedCleint, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { Schema } from "@/../amplify/data/resource";

const Post = async ({params} : {params: {id: string}}) => {
    if(!params.id) return null;

    const isSignedIn = await isAuthenticated();
    const {data: post} = await cookieBasedCleint.models.Post.get({
        id: params.id,
    },{
        authMode: isSignedIn ? "userPool" : "iam",
        selectionSet: ["id", "title"],
    })

    const {data: allComments} = await cookieBasedCleint.models.Comment.list({
        authMode: isSignedIn ? "userPool" : "iam",
        selectionSet: ["content", "postId", "id"],
    })

    const comments = allComments.filter(
        comment => comment.postId === params.id
    );
    
    return (
        <div className="flex flex-col items-center p-4 gap-4">
            <h1 className="text-2xl font-bold">Post Information:</h1>
            <div className="border rounded w-1/2 m-auto bg-gray-200 p-4">
                <h2>Title: {post.title}</h2>
            </div>

            {isSignedIn ? (
                <AddComments
                    addComment={addComment}
                    paramsId={params.id}
                    post={post as Schema["Post"]}
                />
            ) : null}

            <h1 className="text-xl font-bold">Comments: </h1>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <div className="w-96 p-2 rounded border bg-yellow-100 flex justify-between">
                        <div>{comment.content}</div>
                        <form action={async (formData) => {
                            "use server";
                            await deleteComment(formData);
                            revalidatePath(`/post/${params.id}`);
                        }}>
                            <input type="hidden" name="id" id="id" value={comment.id}/>
                            {isSignedIn ? (
                                <button type="submit" className="text-red-950">
                                    X
                                </button>
                            ) : null}
                        </form>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Post