import OnePointSDK, { useFetch } from "@fozg/one-point-sdk";
import { Button, ButtonVariants, TopNavigation } from "@fozg/fozg-ui-elements";
import { Plus } from "react-feather";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

const OPService = new OnePointSDK(
  "https://fozg.net/opapi",
  localStorage.getItem("token") as string
);

export default function () {
  const history = useHistory();
  const { data, loading } = useFetch(() =>
    OPService.getAppByName("whiteboard").getListByName("board").getItems()
  );

  return (
    <>
      <TopNavigation icon={<>WhiteBoard</>} />
      <Button
        onClick={() => {
          history.push("/new");
        }}
        variant={ButtonVariants.default}
        iconBefore={<Plus />}
        m={2}
      >
        New
      </Button>
      {loading && "loading..."}
      {data.map((item: any, i: number) => (
        <Thumb key={i}>
          {/* {JSON.stringify(item)} */}
          <svg width="50%" viewBox="0 0 1500 1000">
            {getPaths(item.data).map((path: string, j: number) => (
              // @ts-ignore
              <path
                d={path}
                key={j}
                fill="#000"
                stroke="#000"
                strokeWidth="2"
              />
            ))}
          </svg>
        </Thumb>
      ))}
    </>
  );
}
const getPaths = (data: any) => {
  try {
    const dt = JSON.parse(data);

    return dt.map((item: any) => item.path);
  } catch (error) {
    return [];
  }
};
const Thumb = styled.div`
  border: 1px solid #ddd;
  margin: 10px;
  text-align: center;
`;
