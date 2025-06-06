## 소개

- 기존의 클라이언트 상태를 다루는 상태관리 라이브러리들과 다르게 서버 상태를 FETCHING, CACHING, 비동기적으로 업데이트하는데 도움을 주는 라이브러리

### Create, Update, Delete 상황의 유용함

- 리액트 쿼리의 useQuery는 Get 요청을 담당한다.

- 리액트 쿼리의 useMutation은 Post, Put, Delete를 담당한다.

- 모든 useQuery는 key를 가진다.

- 모든 useMutation은 정상적으로 호출되었을때 useQuery의 key를 사용할 수 있다.

- key를 사용한 순간, useQuery는 재 작동한다.

- 즉, 게시글 작성과 수정과 삭제 했을때 필연적으로 변할 서버 상태를 즉각적으로 조회할 수 있다.


## 예시 코드

```ts
import Image from "next/image";
import penguin from "./../../public/src/assets/images/penguin.png";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import userStore from "@/public/src/stores/user/userStore";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import Swal from "sweetalert2";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

export default function BoardSend() {
  useFetchUserInfo();
  const { memberId } = userStore();
  const playClickSound = useClickSound();
  const sendBoard = async (formData: FormData): Promise<AxiosResponse<any>> => {
    const response = await axios({
      method: "post",
      url: `https://j10a207.p.ssafy.io/api/community/write-multi?loginUserId=${memberId}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any>, Error, FormData>(sendBoard, {
    onSuccess: () => {
      Swal.fire("성공!", "게시물이 성공적으로 작성되었습니다.", "success");
      queryClient.invalidateQueries("boardInfo");
    },
    onError: (error: any) => {
      console.error("에러발생", error.response?.data || error.message);
      Swal.fire("게시글이 작성되지 못했습니다.");
    },
    onSettled: () => {
      setContent("");
      setImage([]);
    },
  });

  const [content, setContent] = useState("");
  const [image, setImage] = useState<(FileList | File)[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    playClickSound();
    e.preventDefault();

    const formData = new FormData();
    // 파일 추가
    image.forEach((fileOrFileList) => {
      if (fileOrFileList instanceof FileList) {
        for (let i = 0; i < fileOrFileList.length; i++) {
          formData.append("multipartFile", fileOrFileList.item(i)!);
        }
      } else {
        formData.append("multipartFile", fileOrFileList);
      }
    });

    // 다른 필드 데이터 추가
    formData.append(
      "communityCreateReq",
      new Blob([JSON.stringify({ content })], { type: "application/json" })
    );

    mutation.mutate(formData);
  };

  const maxSize = 1024 * 1024;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          Swal.fire("업로드 가능한 최대 파일 크기는 1MB입니다.");
          e.target.value = ""; // 파일 선택 초기화
          return; // 반복문 탈출
        }
      }
      setImage([...image, ...Array.from(files)]);
    }
  };

  const deletePhoto = (num: number) => {
    playClickSound();
    const filteredImage = image.filter((item, i) => i !== num);
    setImage(filteredImage);
  };

  const { asset } = userStore();
  return (
    <div className="grid justify-center items-center row-span-3 grid-cols-12 rounded-md ">
      <div className="col-start-2">
        <Image
          className="rounded-full ring-2 ring-background-1 dark:ring-gray-500 relative"
          src={useGetProfileImage(asset)}
          alt="Extra large avatar"
          width={100}
        ></Image>
      </div>
      <div className="col-start-4 col-end-12 rounded-lg m-2 bg-background-1">
        <form>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center p-4 rounded-lg shadow dark:bg-gray-700">
            <label
              htmlFor="file-input"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
                onClick={playClickSound}
              >
                <path
                  fill="currentColor"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                사진
              </svg>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </label>

            <textarea
              id="chat"
              rows={3}
              className="mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1MB 이하의 사진만 업로드 가능합니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
            {image.length > 0 &&
              image.map((fileOrFileList, index) => {
                if (fileOrFileList instanceof FileList) {
                  return Array.from(fileOrFileList).map((file, fileIndex) => (
                    <div className="relative" key={`${index}-${fileIndex}`}>
                      <img
                        className="p-1 shadow m-1"
                        width={100}
                        src={URL.createObjectURL(file)}
                        alt={`${index}번째 사진`}
                      />
                      <div
                        className="absolute -top-1 -right-3 rounded-full bg-white shadow hover:cursor-pointer"
                        onClick={() => {
                          deletePhoto(index);
                        }}
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                      </div>
                    </div>
                  ));
                } else {
                  return (
                    <div className="relative" key={index}>
                      <img
                        className="p-1 shadow m-1"
                        width={100}
                        src={URL.createObjectURL(fileOrFileList)}
                        alt={`${index}번째 사진`}
                      />
                      <div
                        className="absolute -top-1 -right-3 rounded-full bg-white shadow hover:cursor-pointer"
                        onClick={() => {
                          deletePhoto(index);
                        }}
                      >
                        <svg
                          className="w-6 h-6 text-black dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </form>
      </div>
    </div>
  );
}
```