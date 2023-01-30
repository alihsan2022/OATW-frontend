import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OrphanDetails from "../OrphanageDashboard/OrphanDetails";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PublicIcon from "@mui/icons-material/Public";
import BadgeIcon from "@mui/icons-material/Badge";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getAllUsers,
  getOrphanages,
} from "../../../FirebaseFunctions/AdminOrphanagesFunctions";
import {
  getAllOrphans,
  removeOrphanFromBin,
} from "../../../FirebaseFunctions/AdminOrphansFunctions";
import { getOrphansList } from "../../../FirebaseFunctions/OrphanFunctions";
import placeHolder from "../../../Assets/placeholder-image.png";

const AllOrphans = () => {
  const [combinedOrphans, setCombinedOrphans] = useState();

  const [orphans, setOrphans] = useState([]);
  const [orphanages, setOrphanages] = useState([]);
  const [deletedOrphans, setDeletedOrphans] = useState();
  const [loaded, setLoaded] = useState(false);
  const [display, setDisplay] = useState(true);

  const [searchValueName, setSearchValueName] = useState("");
  const [searchValueOrphanage, setSearchValueOrphanage] = useState("");
  const [searchSponsored, setSearchSponsored] = useState(false);
  const [searchDeleted, setSearchDeleted] = useState(false);
  const [searchAvailable, setSearchAvailable] = useState(false);

  const getOrphans = async () => {
    let data = await getAllOrphans();
    return data;
  };

  useEffect(() => {
    getOrphans().then((data) => setOrphans(data));
  }, []);

  const handleRemoveFromBin = (filteredOrphan) => {
    removeOrphanFromBin(filteredOrphan);
    getOrphans().then((data) => setOrphans(data));
  };

  const handleFilterName = (e) => {
    setSearchValueName(e.toLowerCase());
  };

  const handleFilterOrphanage = (e) => {
    setSearchValueOrphanage(e.toLowerCase());
  };

  const handleSponsoredChange = (e) => {
    setSearchSponsored(e.target.checked);
  };

  const handleAvailableChange = (e) => {
    setSearchAvailable(e.target.checked);
  };

  const handleDeletedChange = (e) => {
    setSearchDeleted(e.target.checked);
  };

  return (
    <div>
      <div className="orphanage__children-header">
        <div>
          <h1>All Orphans</h1>
        </div>
        <div className="header-links">
          <div>
            <GroupAddIcon />
            <span>Add Orphan</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </div>
      </div>
      <div className="orphan-search__container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="orphan-search__filter">
            <div>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Sponsored"
                    labelPlacement="start"
                    onChange={handleSponsoredChange}
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Deleted"
                    labelPlacement="start"
                    onChange={handleDeletedChange}
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Available"
                    labelPlacement="start"
                    onChange={handleAvailableChange}
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
          <div className="orphan-search">
            <input
              onChange={(e) => handleFilterOrphanage(e.target.value)}
              placeholder="Filter By Orphanage"
            />
            <PersonSearchIcon />
          </div>
          <div className="orphan-search">
            <input
              onChange={(e) => handleFilterName(e.target.value)}
              placeholder="Filter By Orphan"
            />
            <PersonSearchIcon />
          </div>
        </div>
      </div>
      <div>
        <div className="allOrphans__list">
          {orphans?.length > 0 &&
            orphans
              .filter((orphan) =>
                orphan?.firstName?.toLowerCase().includes(searchValueName)
              )
              .filter((orphan) =>
                orphan?.orphanageName
                  ?.toLowerCase()
                  .includes(searchValueOrphanage)
              )
              .filter((orphan) => orphan?.notSponsored === !searchSponsored)
              .filter((orphan) => orphan?.notDeleted === !searchDeleted)

              .map((filteredOrphan) => (
                <div className="allOrphans__orphan">
                  <div className="allOrphans__orphan-pic">
                    <div className="allOrphans__orphan-img">
                      {filteredOrphan.profilePic ? (
                        <img src={filteredOrphan.profilePic} />
                      ) : (
                        <img src={placeHolder} />
                      )}
                    </div>
                  </div>
                  <div className="orphan__details">
                    <BadgeIcon />

                    <span>
                      {filteredOrphan.firstName} {filteredOrphan.lastName}
                    </span>
                  </div>
                  <div className="orphan__details">
                    <PublicIcon />

                    <span>{filteredOrphan.orphanageName}</span>
                  </div>
                  <div className="orphan__details">
                    <VisibilityIcon />
                    {filteredOrphan.notDeleted ? (
                      <span>Status: Active</span>
                    ) : (
                      <span>Status: Deleted</span>
                    )}
                  </div>
                  <div className="orphan__details">
                    <HelpOutlineIcon />
                    {filteredOrphan.notSponsored ? (
                      <span>Status: Not sponsored</span>
                    ) : (
                      <span>Status: Sponsored</span>
                    )}
                  </div>
                  <div className="btn__container">
                    {!filteredOrphan.notDeleted && (
                      <div
                        className="orphan__button"
                        onClick={() => {
                          handleRemoveFromBin(filteredOrphan);
                        }}
                      >
                        <DeleteForeverIcon />
                        Remove from Bin
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrphans;
