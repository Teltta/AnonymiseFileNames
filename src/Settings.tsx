import { common, components, util } from "replugged";
import { cfg } from ".";

const { TextInput, SelectItem, FormItem, Text } = components;
const { React } = common;

export function Settings(): React.ReactElement {
  const options = ["Random Characters", "Consistent", "Timestamp"];

  let [randCharLen, setRandCharLen] = React.useState(cfg.get("randomCharLength", 7).toString());
  let [constFilename, setConstFilename] = React.useState(cfg.get("consistentFilename"));

  return (
    <>
      <SelectItem
        options={options.map((option) => {
          return { label: option, value: option };
        })}
        {...util.useSetting(cfg, "method")}>
        Method
      </SelectItem>
      <FormItem style={{marginBottom: "20px"}}>
        <Text>Random Characters Length</Text>
        <TextInput
          value={randCharLen.toString()}
          onChange={(value) => {
            // eslint-disable-next-line
            if (value == null) {
              setRandCharLen("");
            } else if (!isNaN(Number(value))) {
              cfg.set("randomCharLength", parseInt(value, 10));
              setRandCharLen(value);
            }
          }}
          inputMode="numeric"
          required={true}
          minLength={1}></TextInput>
      </FormItem>
      <FormItem>
        <Text>Consistent Filename</Text>
        <TextInput
          value={constFilename}
          onChange={(conFilename) => {
            // eslint-disable-next-line
            if (conFilename == null) {
              setConstFilename("");
            } else {
              cfg.set("consistentFilename", conFilename);
              setConstFilename(conFilename);
            }
          }}
          minLength={1}
          required={true}></TextInput>
      </FormItem>
    </>
  );
}
