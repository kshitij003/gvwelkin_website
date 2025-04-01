"use client";
import {React,useState} from "react";
import {db} from "@/utils/db";
import {admin} from "@/utils/schema";
import {eq} from "drizzle-orm";

function admin_page(){
    const [link,setLink] = useState("");
    const [giveaway,setGiveaway] = useState(true);
    const submit = async () => {
        try {
            await db.update(admin).set({
                link: link,
                giveaway: giveaway
            }).where(eq(admin.id,1)).execute();
            alert("Link added successfully");
        } catch (error) {
            console.error("Failed to add link:", error);
        }
    };
    return (
        <div>
            <form>
                <label>
                    Link:
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                </label>
                <label>
                    Giveaway:
                    <input type="checkbox" checked={giveaway} onChange={(e) => setGiveaway(e.target.checked)} />
                </label>
                <button type="button" onClick={submit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default admin_page;