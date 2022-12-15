import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { back, next } from "../../redux/slices/ownEarnerSlice";
import SignaturePad from "react-signature-canvas";
import { saveSignature } from "../../redux/slices/userSlice";

const TAndC = () => {
  const dispatch = useDispatch();
  let signPad = useRef({});

  const [isSigned, setIsSigned] = useState(false);

  const clear = () => {
    signPad.current.clear();
    setIsSigned(false);
  };
  return (
    <div className="intro-y text-justify leading-relaxed px-5 mt-3">
      <h1 className="mb-6">
        <b>Terms &amp; Conditions</b>
      </h1>
      <p className="mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <p className="mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <p className="mb-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
        <div className="border border-success">
          <small className="text-mute m-3">
            Sign here to accept the terms and conditions
          </small>
          <SignaturePad
            ref={signPad}
            onEnd={() => {
              setIsSigned(true);
            }}
            penColor="black"
            canvasProps={{
              width: 280,
              height: 150,
              className: "sigCanvas",
            }}
          />
          <button onClick={clear} className="btn btn-warning">
            Clear
          </button>
        </div>
      </div>
      <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
        <button
          className="btn btn-secondary w-24"
          onClick={() => dispatch(back())}
        >
          Previous
        </button>
        <button
          disabled={!isSigned}
          className="btn btn-success w-24 ml-2"
          onClick={() => {dispatch(saveSignature(signPad.current.toDataURL())); dispatch(next())}}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TAndC;
