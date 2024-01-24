type Props = {};

function TableLoader({}: Props) {
    return (
        <div className="w-full p-2">
            {["lskj", "2lk3", "lksdl2", "lk23k", "lsdd55sd5"].map((item) => (
                <div
                    className="flex items-center align-items justify-between w-full my-2 gap-2"
                    key={item}
                >
                    <div className="shimmer w-[75px] h-[75px]"></div>
                    <div className="w-full h-full">
                        <div className="flex-grow h-8 shimmer mb-2"></div>
                        <div className="flex-grow h-3 shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TableLoader;
