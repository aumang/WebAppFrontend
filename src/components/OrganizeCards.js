export default function OrganizeCards(){
    return(
        <div>
            <div class="d-flex bg-dark-subtle p-2">
                I'm a flexbox container!
            </div>
            <div class="d-inline-flex bg-dark-subtle p-2">
                I'm a inline flexbox container!
            </div>

            <div className="d-flex flex-row bg-dark-subtle mb-3">
                <div className="p-2">Flex 1</div>
                <div className="p-2">Flex 2</div>
                <div className="p-2">Flex 3</div>
            </div>

            <div className="d-flex flex-row-reverse bg-dark-subtle bd-highlight mb-3">
                <div className="p-2">Flex 1</div>
                <div className="p-2">Flex 2</div>
                <div className="p-2">Flex 3</div>
            </div>

            <div className="d-flex flex-row bg-dark-subtle justify-content-center">
                <div className="p-2 align-content-center bg-info">Item 1</div>
                <div className="flex p-2">
                    <div className="p-2 bg-body">Item 2</div>
                    <div className="p-2 bg-black">Item 3</div>
                </div>
                <div className="p-2 align-content-center bg-info border border-2 border-danger rounded-pill">
                    <p>Item 5</p>
                </div>
            </div>

        </div>
    );
}