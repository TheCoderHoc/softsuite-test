import "./styles.scss";
import { format } from "date-fns";
import { ElementLinkType } from "../../../types/element";

interface ElementLinkDetailsProps {
    elementLink: ElementLinkType | undefined;
}

export default function ElementLinkDetails({
    elementLink,
}: ElementLinkDetailsProps) {
    return (
        <div className="elementLinkDetails">
            <h2>Element Link Details</h2>

            <ul className="grid__details__list">
                <li>
                    <span>Name</span>
                    <span>{elementLink?.name}</span>
                </li>

                <li>
                    <span>Sub Organization</span>
                    <span>{elementLink?.suborganizationId}</span>
                </li>

                <li>
                    <span>Department</span>
                    <span>{elementLink?.departmentId}</span>
                </li>

                <li>
                    <span>Location</span>
                    <span>{elementLink?.locationId}</span>
                </li>

                <li>
                    <span>Employee Type</span>
                    <span>{elementLink?.employeeTypeValueId}</span>
                </li>

                <li>
                    <span>Employee Category</span>
                    <span>{elementLink?.employeeCategoryValueId}</span>
                </li>

                <li>
                    <span>Effective Date</span>
                    <span>{elementLink?.effectiveStartDate}</span>
                </li>

                <li>
                    <span>Status</span>
                    <span>{elementLink?.status}</span>
                </li>

                <li>
                    <span>Grade</span>
                    <span>{elementLink?.grade}</span>
                </li>

                <li>
                    <span>Grade Step</span>
                    <span>{elementLink?.gradeStep}</span>
                </li>

                <li>
                    <span>Amount Type</span>
                    <span>{elementLink?.amountType}</span>
                </li>

                <li>
                    <span>Amount</span>
                    <span>{elementLink?.amount}</span>
                </li>

                <li>
                    <span>Pension</span>
                    <span>{elementLink?.pension}</span>
                </li>

                <li>
                    <span>Housing</span>
                    <span>{elementLink?.housingId}</span>
                </li>

                <li>
                    <span>Effective Start Date</span>
                    <span>
                        {elementLink?.effectiveStartDate &&
                            format(
                                new Date(elementLink?.effectiveStartDate),
                                "dd -MM - yyyy"
                            )}
                    </span>
                </li>

                <li>
                    <span>Effective End Date</span>
                    <span>
                        {elementLink?.effectiveEndDate &&
                            format(
                                new Date(elementLink?.effectiveEndDate),
                                "dd  -MM - yyyy"
                            )}
                    </span>
                </li>

                <li>
                    <span>Modified By</span>
                    <span>{elementLink?.modifiedBy}</span>
                </li>

                <li>
                    <span></span>
                    <span></span>
                </li>
            </ul>
        </div>
    );
}
