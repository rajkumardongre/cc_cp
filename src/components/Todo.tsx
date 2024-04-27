"use client";
import React, { BaseSyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";
import { Schema } from "@/../amplify/data/resource";
import { checkTodo } from "@/app/_actions/actions";
import moment from "moment";

const Todo = ({
    todo,
    onDelete,
    isSignedIn,
}: {
    todo: Pick<Schema["Todo"], "title" | "id" | "completed" | "createdAt" | "updatedAt">;
    onDelete: (id: string) => void;
    isSignedIn: boolean;
}) => {
    const [checked, setChecked] = useState(todo.completed)
    const onChecked = (e: BaseSyntheticEvent) => {
        checkTodo(!checked, todo.id)
        setChecked(!checked)
    }
    return (
        <div className="flex flex-col border bg-gray-100 w-full p-4 rounded">
            <div
                className=" flex justify-between"
            >

                <div className="flex gap-2">
                    <div><input type="checkbox" defaultChecked={checked} onChange={onChecked} /></div>
                    <div className={checked ? 'line-through' : ''}>{todo.title}</div>
                </div>

                <input type="hidden" name="id" id="id" value={todo.id} />
                {isSignedIn ? (
                    <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => onDelete(todo.id)}
                    >X</button>
                ) : null}
            </div>
            <p className="text-xs text-gray-700 pt-4">
            {todo.updatedAt != todo.createdAt ? (
                `Updated ${moment(todo.updatedAt).fromNow()}`
            ) : (
                `Created ${moment(todo.updatedAt).fromNow()}`
            )}
            </p>
        </div>
    )
}

export default Todo