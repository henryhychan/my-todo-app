import { useState, useEffect } from "react";

function ViewDetail({children, style, ...props}) {
    const [show, setShow] = useState(false);

    useEffect(() => {

    }, []);

    return (show && (
        <div style={style} props>
            {children}
        </div>)
    );
}

export default ViewDetail;