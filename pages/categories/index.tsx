import SearchBox from "../../Components/Form/SearchBox";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";

export default function Categories(props:any) {
    return <Layout isLoggedIn={false}>
        <SEO title="Indipix | Categories" description="Indipix categories" keywords="Indipix, categories" />
        <div className="bg-[#EA6940]" style={{ height: "90vh" }}>
            <div className="flex items-center justify-center -translate-x-1/12 overflow-x-hidden pt-10">
                {[1, 2, 3, 2, 1].map(item => <img className={`mx-3 border-8 border-white ${item == 1 && `scale-75`} ${item == 2 && `scale-90`} ${item == 3 && `scale-100`}`} key={item} src={`https://source.unsplash.com/random/300x400/?sig=${item}`} />)}
            </div>
            <h1 className="text-center text-4xl font-bold text-white mt-5 uppercase">Explore our collections</h1>
        </div>

        <div className="container mx-auto px-5 lg:px-20">
            <div className="my-10"><SearchBox className="bg-[#C1BBBB9E] text-black" /></div>
        </div>
    </Layout>
}