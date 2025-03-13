import React from 'react'
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import Banner2 from "@/components/home/Banner2";
import Relatives from "@/components/details/Relatives";

const ProductLayout = (props) => {
    return <Main>
        <Container>
            <div className="flex flex-col w-full h-full gap-y-20 mt-28">
                <div className="grid grid-cols-12 gap-8">
                    {props.children}
                </div>
                <Relatives />
                <Banner2 className={"!px-0"} />
            </div>
        </Container>
    </Main>
}

export default ProductLayout