import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Country, State, City } from "country-state-city";
import { useEffect,useState } from "react";

function LocationInput({country,setCountry,state,setState,location,setLocation}){
        const [countryCodeKey,setCountryCodeKey] = useState("")
        const [stateCodeKey,setStateCodeKey] = useState("")

          const countries = Country.getAllCountries();
          const states = State.getStatesOfCountry(countryCodeKey);
          const cities = City.getCitiesOfState(countryCodeKey,stateCodeKey);

            useEffect(() => {
              if(country){
                 countries?.find((c) => c.name.trim().toLowerCase() === country.trim().toLowerCase() ? setCountryCodeKey(c?.isoCode ) : null)
              }
            },[countries,country])
            
            
            useEffect(() => {
              if( country && state){
                states?.find((s) => s.name.trim().toLowerCase() === state.trim().toLowerCase() ? setStateCodeKey(s?.isoCode) : null)
              }
            },[states,state,country])
    return(
        <div>
                                            <Box sx={{m:1, width: `100%` }}>
                              <FormControl  fullWidth>
                                <InputLabel  id="demo-simple-select-label" required>
                                  Select Country
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={country}
                                  required
                                  label="Select Country"
                                  onChange={(e) => setCountry(e.target.value)}
                                >
                                  {countries?.map((c) => (
                                    <MenuItem value={c.name}>{c.name}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                            <br />
            
                                <Box sx={{ m:1, width: `100%` }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" required>
                                  Select State
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={state}
                                  disabled={!country}
                                  required
                                  label="Select State"
                                  onChange={(e) => setState(e.target.value)}
                                >
                                  {states?.map((s) => (
                                    <MenuItem value={s.name}>{s.name}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                               {!country ? <p className="mt-2 text-danger fw-bold" style={{fontSize : `9pt`}}>Select Country to Enable State Selection</p> : null}
                            </Box>
                            <br />
            
                                <Box sx={{ m:1, width: `100%` }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" required>
                                  Select City/Town
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={location}
                                  disabled={!state}
                                  required
                                  label="Select City/Town"
                                  onChange={(e) => setLocation(e.target.value)}
                                >
                                  {cities?.map((c) => (
                                    <MenuItem value={c.name}>{c.name}</MenuItem>
                                  ))}
                                </Select>
                                 {!country || !state ? <p className="mt-2 text-danger fw-bold" style={{fontSize : `9pt`}}>Select State to Enable City/Town Selection</p> : null}
                              </FormControl>
                              
                            </Box>
        </div>
    )
}

export default LocationInput