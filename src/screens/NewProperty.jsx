import { useState } from "react";
import {
  Lucide,
  Tippy,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TomSelect,
} from "@/base-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { saveEditor } from "../redux/slices/editorSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatImage } from "../utils/format";
import httpRequest from "../utils/httpRequest";
import { controllers } from "../config/controllers";
import {
  addFaq,
  updateCaptionImage,
  updateCoverImage,
  updateOtherImages,
} from "../redux/slices/fileSlice";
import Faq from "../layouts/Faq";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/sharedService";
import { setAlertModal, setLoader } from "../redux/slices/modalSlice";
import { propertyCategories, propertyTypes } from "../mock/propertyData";
import { saveProperty } from "../services/propertyService";

const NewProperty = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [currentPricePerUnit, setCurrentPricePerUnit] = useState("");
  const [unitsPerPlot, setUnitsPerPlot] = useState();
  const [planNumber, setPlanNumber] = useState();
  const [editorData, setEditorData] = useState("");

  const dispatch = useDispatch();
  const otherImages = useSelector((state) => state?.file?.otherImages);
  const captionImage = useSelector((state) => state?.file?.captionImage);
  const coverImage = useSelector((state) => state?.file?.coverImage);
  // const otherPhotos = useSelector((state) => state?.file?.otherPhotos);
  const faq = useSelector((state) => state?.file?.faq);

  // console.log(faq)

  const uuid = uuidv4();

  const updateEditor = (data) => {
    setEditorData(data);
  };

  const handleOtherImages = (files) => {
    for (let i = 0; i < files?.length; i++) {
      formatImage(files[i], async (uri) => {
        dispatch(updateOtherImages(uri));
      });
    }
  };

  const handleCaptionImage = (files) => {
    formatImage(files[0], async (uri) => {
      dispatch(updateCaptionImage(uri));
    });
  };

  const handleCoverImage = (files) => {
    formatImage(files[0], async (uri) => {
      dispatch(updateCoverImage(uri));
    });
  };

  const saveFaq = (e) => {
    e.preventDefault();
    dispatch(addFaq({ uuid, question, answer }));
    setQuestion("");
    setAnswer("");
  };

  // console.log('otherPhotos', otherPhotos)

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);

            formatImage(file, async (uri) => {
              const payload = {
                b64: uri,
                folderName: "propertyImages",
              };

              httpRequest(controllers.upload, "post", payload)
                .then((res) => {
                  resolve({
                    default: res?.data?.data?.secure_url,
                  });
                })
                .catch((err) => {
                  reject(err);
                });
            });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const listProperty = async() => {
    if(name === ""){
     return alert("property name is required")
    }

    if(caption === ""){
      return alert("caption is required")
     }

     if(editorData === ""){
      return alert("create some content for this new property")
     }

     if(propertyCategory === ""){
      return alert("select property category")
     }

     if(propertyType === ""){
      return alert("select property type")
     }

     if(area === ""){
      return alert("Property location is required")
     }

     if(captionImage === ""){
      return alert("Caption image is required")
     }

     if(coverImage === ""){
      return alert("Cover image is required")
     }

     dispatch(setLoader({status: true}))

     let otherPhotos = []

     const photo= (await uploadFile(({folderName: "properties", b64: captionImage})))?.data?.data?.secure_url;
     const coverPhoto= (await uploadFile(({folderName: "properties", b64: coverImage,})))?.data?.data?.secure_url;
     
     for(let i = 0; i < otherImages.length; i++){
      let img = (await uploadFile(({folderName: "properties", b64: otherImages[i]})))?.data?.data?.secure_url;
        otherPhotos.push(img)
     }

   

     const payload = {
      name,
      title,
      content: editorData,
      faq,
      propertyCategory,
      propertyType,
      area,
      currentPricePerUnit,
      unitsPerPlot,
      planNumber,
      photo,
      coverPhoto,
      otherPhotos

     }

     const res = (await saveProperty(payload))?.data

     console.log(res)

     dispatch(setLoader({status: false}))

     dispatch(
      setAlertModal({
        status: true,
        type: res?.status ? "Success" : "Failed",
        message: res.message,
      })
    );

   
  };

  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">List a new Property</h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button
            type="button"
            className="btn btn-primary shadow-md flex items-center"
            onClick={listProperty}
          >
            <Lucide icon="Save" className="w-4 h-4 mr-2" /> Save
          </button>
        </div>
      </div>
      <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
        {/* BEGIN: Post Content */}
        <div className="intro-y col-span-12 lg:col-span-8">
          <input
            type="text"
            className="intro-y form-control py-3 px-4 box pr-10"
            placeholder="Property Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="form-control mt-3"
            placeholder="Write a caption"
            style={{ height: 120 }}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <TabGroup className="post intro-y overflow-hidden box mt-5">
            <TabList className="post__tabs nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800">
              <Tab
                fullWidth={false}
                className="w-full sm:w-40 py-0 px-0"
                tag="button"
              >
                <Tippy
                  content="Fill in the article content"
                  className="tooltip w-full flex items-center justify-center py-4"
                  aria-controls="content"
                  aria-selected="true"
                >
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Content
                </Tippy>
              </Tab>
            </TabList>
            <TabPanels className="post__content">
              <TabPanel className="p-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="mt-5">
                    {/* <ClassicEditor
                      value={editorData}
                      onChange={setEditorData}
                    /> */}

                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      config={{
                        // plugins: [ImageResize],
                        extraPlugins: [uploadPlugin],
                        removePlugins: ["MediaEmbed"],
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        updateEditor(data);
                      }}
                      onReady={(editor) => {
                        dispatch(saveEditor(editor));
                      }}
                    />
                  </div>
                </div>
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 mt-5">
                  <div className="font-medium text-primary flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    FAQ
                  </div>
                  {faq?.length > 0 &&
                    faq.map((fa, index) => <Faq fa={fa} key={index} />)}

                  <form onSubmit={saveFaq}>
                    <div className="grid grid-cols-12 gap-2 mt-5">
                      <input
                        type="text"
                        className="form-control col-span-5"
                        placeholder="Enter Question"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control col-span-5"
                        placeholder="Enter Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                      />
                      <input
                        type="submit"
                        value="+ Add"
                        className="form-control col-span-2 btn btn-success text-white"
                        placeholder="Input inline 3"
                        aria-label="default input inline 3"
                      />
                    </div>
                  </form>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        {/* END: Post Content */}
        {/* BEGIN: Post Info */}
        <div className="col-span-12 lg:col-span-4">
          <div className="intro-y box p-5">
            <div>
              <label className="form-label text-primary">
                <b>Property Category</b>
              </label>
              <TomSelect
                id="post-form-3"
                value={propertyCategory}
                onChange={setPropertyCategory}
                className="w-full"
              >
               
               {propertyCategories.map((category) => (
                <option value={category?._id}>{category?.name}</option>
               ))}
              </TomSelect>
            </div>
            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Property Type</b>
              </label>
              <TomSelect
                id="post-form-3"
                value={propertyType}
                onChange={setPropertyType}
                className="w-full"
              >
                {propertyTypes.map((type) => (
                <option value={type?._id}>{type?.name}</option>
               ))}
              </TomSelect>
            </div>
            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Property Title</b>
              </label>
              <input
                type="text"
                className="form-control col-span-5"
                placeholder="e.g Govt. Excision"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Location</b>
              </label>
              <input
                type="text"
                className="form-control col-span-5"
                placeholder="e.g Akodo, Ibeju-Lekki"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Plot Size (1 plot)</b>
              </label>
              <input
                type="number"
                className="form-control col-span-5"
                placeholder="i.e 644"
                required
                value={unitsPerPlot}
                onChange={(e) => setUnitsPerPlot(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Current price/unit</b>
              </label>
              <input
                type="text"
                className="form-control col-span-5"
                placeholder="i.e 40000"
                required
                value={currentPricePerUnit}
                onChange={(e) => setCurrentPricePerUnit(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="form-label text-primary">
                <b>Plan Number</b>
              </label>
              <input
                type="text"
                className="form-control col-span-5"
                placeholder="e.g LS/D/LA2934"
                required
                value={planNumber}
                onChange={(e) => setPlanNumber(e.target.value)}
              />
            </div>

            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 mt-5">
              <div className="font-medium text-primary flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                Image Uploads
              </div>
              <div className="mt-5">
                <div className="mt-4">
                  <label className="form-label">
                    <b>Caption Image</b>
                  </label>
                  <div className="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                    {captionImage && (
                      <div className="flex flex-wrap px-4 justify-center">
                        <div className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                          <img
                            className="rounded-md"
                            alt=""
                            src={captionImage}
                          />
                        </div>
                      </div>
                    )}

                    <div className="px-4 pb-4 flex items-center cursor-pointer relative">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="text-success mr-1">
                        {captionImage
                          ? "Change image file"
                          : "Upload a file or drag and drop"}
                      </span>{" "}
                      <input
                        type="file"
                        className="w-full h-full top-0 left-0 absolute opacity-0"
                        onChange={(e) => handleCaptionImage(e.target.files)}
                        accept="image/jpeg, image/png"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="form-label">
                    <b>Cover Image</b>
                  </label>
                  <div className="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                    {coverImage && (
                      <div className="flex flex-wrap px-4 justify-center">
                        <div className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                          <img className="rounded-md" alt="" src={coverImage} />
                        </div>
                      </div>
                    )}

                    <div className="px-4 pb-4 flex items-center cursor-pointer relative">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="text-success mr-1">
                        {coverImage
                          ? "Change image file"
                          : "Upload a file or drag and drop"}
                      </span>{" "}
                      <input
                        type="file"
                        className="w-full h-full top-0 left-0 absolute opacity-0"
                        onChange={(e) => handleCoverImage(e.target.files)}
                        accept="image/jpeg, image/png"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label">
                    <b>Other Images (select multiples)</b>
                  </label>
                  <div className="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                    <div className="flex flex-wrap px-4 justify-center">
                      {otherImages.map((image, index) => (
                        <div
                          key={index}
                          className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in"
                        >
                          <img
                            className="rounded-md "
                            alt="Midone Tailwind HTML Admin Template"
                            src={image}
                          />
                          <Tippy
                            tag="div"
                            content="Remove this image?"
                            className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                          >
                            <Lucide icon="X" className="w-4 h-4" />
                          </Tippy>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4 flex items-center cursor-pointer relative">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="text-success mr-1">
                        {otherImages.length > 0
                          ? "Add more images"
                          : "Upload files or drag and drop"}
                      </span>{" "}
                      <input
                        type="file"
                        className="w-full h-full top-0 left-0 absolute opacity-0"
                        multiple="multiple"
                        accept="image/jpeg, image/png"
                        onChange={(e) => handleOtherImages(e.target.files)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END: Post Info */}
      </div>
    </>
  );
};

export default NewProperty;
