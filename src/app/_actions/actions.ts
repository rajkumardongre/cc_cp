"use server"

import { cookieBasedCleint } from "@/utils/amplify-utils"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

// export async function  deleteComment(formData: FormData){
//     const id = formData.get("id")?.toString();
//     if(!id) return;
//     const {data: deletedComment} = await cookieBasedCleint.models.Comment.delete({
//         id,
//     });
//     console.log("deleted", deleteComment);
// }

// export async function addComment(
//     content: string,
//     post: Schema["Post"],
//     paramsId: string
// ){
//     if(content.trim().length === 0) return;
//     const { data: comment} = await cookieBasedCleint.models.Comment.create({
//         postId: post.id,
//         content
//     })

//     console.log("got comment", comment)
//     revalidatePath(`/post/${paramsId}`)
// }

export async function onDeleteTodo(id: string){
    const {data, errors} = await cookieBasedCleint.models.Todo.delete({
        id,
    })
    console.log("data deleted", data, errors);
    revalidatePath("/");
}

export async function createTodo(formData: FormData){
    const {data} = await cookieBasedCleint.models.Todo.create({
        title: formData.get('title')?.toString() || "",
        completed: false
    })
    console.log("create Todo data", data)
    redirect("/")
}

export async function checkTodo(checked:boolean, id:string){
    const {data} = await cookieBasedCleint.models.Todo.update({
        completed: checked,
        id: id
    })
    console.log("check Todo data", data)
    redirect("/")
}