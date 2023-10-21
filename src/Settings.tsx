import { common, components } from "replugged";
import { cfg } from ".";

const { TextInput, SelectItem, FormItem, Text } = components;
const { React } = common;

export function Settings(): React.ReactElement {
  const options = ["Random Characters", "Consistent", "Timestamp"];

  let [method, setMethod] = React.useState(cfg.get("method"));
  let [randCharLen, setRandCharLen] = React.useState(cfg.get("randomCharLength", 7).toString());
  let [constFilename, setConstFilename] = React.useState(cfg.get("consistentFilename"));

  return (
    <>
      <SelectItem
        options={options.map((option) => {
          return { label: option, value: option };
        })}
        value={method}
        onChange={(val) => {
          cfg.set("method", val);
          setMethod(val);
        }}>
        Method
      </SelectItem>
      <FormItem style={{ marginBottom: "20px" }}>
        <Text>Random Characters Length</Text>
        <TextInput
          value={randCharLen.toString()}
          onChange={(value) => {
            if (!value) {
              setRandCharLen("");
            } else if (!isNaN(Number(value))) {
              const num = Math.min(900, Math.max(1, parseInt(value, 10)));
              cfg.set("randomCharLength", num);
              setRandCharLen(num.toString());
            }
          }}
          inputMode="numeric"
          required={true}
          minLength={1}
          disabled={method != "Random Characters"}></TextInput>
      </FormItem>
      <FormItem>
        <Text>Consistent Filename</Text>
        <TextInput
          value={constFilename}
          onChange={(conFilename) => {
            if (!conFilename) {
              setConstFilename("");
            } else {
              cfg.set("consistentFilename", conFilename);
              setConstFilename(conFilename);
            }
          }}
          minLength={1}
          maxLength={900}
          required={true}
          disabled={method != "Consistent"}></TextInput>
      </FormItem>
    </>
  );
}
