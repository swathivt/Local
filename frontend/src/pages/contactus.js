import { NavBar } from "../components/sections/navbar";
import { Container, Stack, Button } from "react-bootstrap";
import { Footer } from "../components/sections/footer.js";

export function Contactus() {
  return (
    <div>
      <NavBar />
      <Stack gap={4} className="col-md-3 mx-auto">
      <div className="bg-light border">First item</div>
      <div className="bg-light border">Second item</div>
      <div className="bg-light border">Third item</div>
    
        <Button variant="secondary">Save changes</Button>
        <Button variant="outline-secondary">Cancel</Button>
      </Stack>
      <Footer />
    </div>
  );
}
