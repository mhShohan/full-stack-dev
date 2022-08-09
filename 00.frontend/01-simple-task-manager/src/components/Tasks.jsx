import React from 'react';
import SingleTask from './SingleTask';

export default function Tasks({ tasks }) {
  return (
    <div className="container flex justify-center">
      <section className="py-4">
        <div className="flex">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-primary text-center border-b-2">
                    <th
                      className="
                           w-1/4
                           text-lg
                           font-semibold
                           text-gray-900
                           px-3
                           "
                    >
                      Index
                    </th>
                    <th
                      className="
                           w-3/4
                           text-lg
                           font-semibold
                           text-gray-900
                           min-w-[360px]
                           px-3
                           lg:px-4
                           "
                    >
                      Task
                    </th>
                    <th
                      className="
                           w-1/4
                           text-lg
                           font-semibold
                           text-gray-900
                           min-w-[150px]
                           px-3
                           lg:px-4
                           "
                    >
                      Create At
                    </th>

                    <th
                      className="
                           w-1/4
                           text-lg
                           font-semibold
                           text-gray-900
                           min-w-[200px]
                           px-3
                           lg:px-4
                           "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <SingleTask key={index} task={task} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
