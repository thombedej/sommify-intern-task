import Logo from "../assets/brand/sommify.svg";
import { products } from "../components/Header";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDimensions } from "../hooks";
import ButtonHomepage from "../components/ButtonHomepage";

const ProductCard = ({ label, path, icon, description, index, beta }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const { isMobile } = useDimensions();

  return (
    <motion.div
      style={{
        borderRadius: 16,
        border: "1px solid #efefef",
        boxShadow: "3px 3px 6px -2px #2a2a2a40",
        width: "calc(100% - 40px)",
        width: "268px",
        height: isMobile ? 70 : 80,
        height: "300px",
        marginBottom: isMobile ? 10 : 16,
        padding: "0 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        fontSize: 16,
        position: "relative",
        cursor: "pointer",
        // gradient that goes from #fff at 75% to #F9F9F9
        background: "linear-gradient(180deg, #fff 75%, #fafbfc)",
      }}
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(path)}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingTop: 15,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          justifyContent: "flex-start",
          height: "100%",
          fontSize: isMobile ? 14 : 16,
        }}
      >
        <div
          style={{
            fontWeight: 600,
          }}
        >
          {icon}
          {label}

          {beta && (
            <span
              style={{
                marginLeft: 8,
                fontSize: "0.75em",
                color: "#FFA500",
              }}
            >
              beta
            </span>
          )}
        </div>
        <div
          style={{
            fontWeight: 300,
            textWrap: "balance",
            color: "#B3B3BD",
            minWidth: "100%",
            paddingTop: 10,
          }}
        >
          {description.toLowerCase()}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: hover ? 0.45 : 0.2,
          display: "flex",
          alignItems: "start",
          paddingLeft: 16,
          paddingTop: 15,
          height: "5%",
        }}
      >
        <FaArrowRight
          style={{
            fontSize: 20,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home({}) {
  const { isMobile, height } = useDimensions();

  return (
    <div
      style={{
        minHeight: height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 420,
        margin: "auto",
        maxWidth: "80vw",
        color: "#28333C",
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: 50,
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            height: 25,
            filter: "brightness(0)",
            marginBottom: "20px",
          }}
        />
      </div>

      <motion.div
        style={{
          display: "flex",
          gap: "1rem",
          // marginTop: "auto",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: isMobile ? "auto" : 10,
        }}
      >
        {products.map(({ label, path, icon, description, beta }, index) => (
          <ProductCard
            key={"product_" + index}
            label={label}
            path={path}
            icon={icon}
            description={description}
            index={index}
            beta={beta}
          />
        ))}
      </motion.div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: isMobile ? "5vh" : "auto",
          width: "calc(100% - 40px)",
          paddingInline: 20,
        }}
      >
        <ButtonHomepage
          transparent
          onClick={() => {
            window.open("https://sommify.ai", "_blank");
          }}
        >
          <FaChevronLeft style={{ marginRight: 4 }} /> Main page
        </ButtonHomepage>

        <ButtonHomepage
          transparent
          onClick={() => {
            window.open("https://docs.sommify.ai", "_blank");
          }}
        >
          Read docs <FaChevronRight style={{ marginLeft: 4 }} />
        </ButtonHomepage>
      </div>
    </div>
  );
}
