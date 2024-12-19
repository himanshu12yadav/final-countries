import {useParams} from "react-router-dom";

export default function Contact() {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>Contact</h1>
        </div>
    )
}
