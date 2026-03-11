import rhinoscriptsyntax as rs
import Rhino.Geometry as rg

def create_pyramid():
    """
    Creates a pyramid with 50mm width and 50mm height
    Base is centered at origin
    """
    # Define base dimensions
    base_width = 50.0  # mm
    height = 50.0      # mm
    
    # Calculate half-width for centering
    half_width = base_width / 2.0
    
    # Define base corners (square base centered at origin)
    base_corners = [
        rs.AddPoint([-half_width, -half_width, 0]),
        rs.AddPoint([half_width, -half_width, 0]),
        rs.AddPoint([half_width, half_width, 0]),
        rs.AddPoint([-half_width, half_width, 0])
    ]
    
    # Define apex point
    apex = rs.AddPoint([0, 0, height])
    
    # Create base surface
    base_curve = rs.AddPolyline([
        [-half_width, -half_width, 0],
        [half_width, -half_width, 0],
        [half_width, half_width, 0],
        [-half_width, half_width, 0],
        [-half_width, -half_width, 0]
    ])
    base_surface = rs.AddPlanarSrf([base_curve])
    
    # Create side faces
    side_faces = []
    corner_coords = [
        [-half_width, -half_width, 0],
        [half_width, -half_width, 0],
        [half_width, half_width, 0],
        [-half_width, half_width, 0]
    ]
    
    for i in range(4):
        next_i = (i + 1) % 4
        # Create triangular face
        triangle = rs.AddPolyline([
            corner_coords[i],
            corner_coords[next_i],
            [0, 0, height],
            corner_coords[i]
        ])
        face = rs.AddPlanarSrf([triangle])
        if face:
            side_faces.extend(face)
    
    # Join all surfaces into a closed polysurface
    all_surfaces = []
    if base_surface:
        all_surfaces.extend(base_surface)
    all_surfaces.extend(side_faces)
    
    pyramid = rs.JoinSurfaces(all_surfaces, delete_input=True)
    
    # Clean up temporary points and curves
    rs.DeleteObjects(base_corners)
    rs.DeleteObject(apex)
    rs.DeleteObject(base_curve)
    
    # Select the pyramid
    if pyramid:
        rs.SelectObject(pyramid)
        print("Pyramid created successfully!")
        print(f"Base: {base_width}mm x {base_width}mm")
        print(f"Height: {height}mm")
    
    return pyramid

# Run the function
if __name__ == "__main__":
    create_pyramid()
