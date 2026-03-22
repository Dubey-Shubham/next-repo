interface BlogIdPageprops {
    params: Promise<{blogId: string}>
}

export default async function BlogIdPage({params}: BlogIdPageprops) {
    const {blogId} = await params;
    return(
        <div>
            BlogIdPage is the new page Id={blogId}
        </div>
    )
}