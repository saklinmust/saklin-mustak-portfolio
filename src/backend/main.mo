import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      switch (Text.compare(p1.name, p2.name)) {
        case (#equal) { Text.compare(p1.description, p2.description) };
        case (other) { other };
      };
    };
  };

  type Project = {
    name : Text;
    description : Text;
  };

  type Portfolio = {
    owner : Text;
    title : Text;
    projects : [Project];
  };

  let projectList = List.empty<Project>();

  public query ({ caller }) func getPortfolioMetadata() : async { owner : Text; title : Text } {
    {
      owner = "Saklin Mustak";
      title = "Portfolio";
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projectList.toArray().sort();
  };

  public query ({ caller }) func getPortfolio() : async Portfolio {
    {
      owner = "Saklin Mustak";
      title = "Portfolio";
      projects = projectList.toArray().sort();
    };
  };
};
