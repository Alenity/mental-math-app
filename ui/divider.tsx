export default function Divider({horizontal}:{horizontal: boolean}) {
    return (
        horizontal ? 
        <div className="w-full border-text-color border my-0.5"></div> :
        <div className="h-full border-text-color border mx-0.5"></div>
    );
}