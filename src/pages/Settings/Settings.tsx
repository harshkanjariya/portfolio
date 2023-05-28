import {Switch} from "@mui/material";
import {getCurrentEnvironment, setEnvironment} from "../../utils/ui";
import {environments} from "../../utils/constants";

function Settings() {
  const env = getCurrentEnvironment();

  return <div className={'page-body'}>
    <table>
      <tbody>
      <tr>
        <td>
          <Switch
            onChange={(e) => setEnvironment(e.currentTarget.checked ? environments.windows : '')}
            defaultChecked={env == environments.windows}/>
        </td>
        <td>Keep me login to this computer</td>
      </tr>
      </tbody>
    </table>
  </div>;
}

export default Settings;