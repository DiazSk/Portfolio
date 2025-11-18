import { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import PropTypes from "prop-types";
import DecryptedText from "./DecryptedText";
import ShinyText from "./ShinyText";
import HoverCard3D from "./HoverCard3D";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  architecture,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <HoverCard3D 
        className="group"
        glowColor="132, 0, 255"
        tiltAmount={8}
      >
        <div
          className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0 px-6"
          onMouseEnter={() => setPreview(image)}
          onMouseLeave={() => setPreview(null)}
        >
          <div>
            <p className="text-2xl font-semibold">
              <DecryptedText 
                text={title}
                speed={40}
                maxIterations={8}
                animateOn="hover"
                className="text-white text-2xl"
              />
            </p>
            <div className="flex gap-5 mt-2 text-sand">
              {tags.map((tag) => (
                <ShinyText 
                  key={tag.id} 
                  text={tag.name} 
                  speed={4}
                  className="text-sm"
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsHidden(true)}
            className="flex items-center gap-1 cursor-pointer hover-animation"
          >
            <ShinyText text="Read More" speed={3} className="text-base" />
            <img src="assets/arrow-right.svg" className="w-5" />
          </button>
        </div>
      </HoverCard3D>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          architecture={architecture}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

Project.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subDescription: PropTypes.arrayOf(PropTypes.string).isRequired,
  href: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  architecture: PropTypes.string,
  setPreview: PropTypes.func.isRequired
};

export default Project;
