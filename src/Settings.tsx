import { common, components, util } from "replugged";
import { cfg } from ".";

const { TextInput, SelectItem, FormItem } = components;
const { React } = common;

export function Settings(): React.ReactElement {
  const options = ["Random Characters", "Consistent", "Timestamp"];
  const textStyle: React.CSSProperties = {
    color: "var(--header-secondary)",
    fontFamily: "var(--font-display)",
    lineHeight: "16px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    fontStyle: "inherit",
    textTransform: "uppercase",
  };

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
      <FormItem>
        <div style={{ marginBottom: "20px" }}>
          <div style={textStyle}>
            <h2>Random Characters Length</h2>
          </div>
          <TextInput
            value={randCharLen.toString()}
            onChange={(value) => {
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
        </div>
      </FormItem>
      <FormItem>
        <div>
          <div style={textStyle}>
            <h2>Consistent Filename</h2>
          </div>
          <TextInput
            value={constFilename}
            onChange={(conFilename) => {
              if (conFilename == null) {
                setConstFilename("");
              } else {
                cfg.set("consistentFilename", conFilename);
                setConstFilename(conFilename);
              }
            }}
            minLength={1}
            required={true}></TextInput>
        </div>
      </FormItem>
    </>
  );
}
